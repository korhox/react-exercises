import useSWR from 'swr';

export interface Project {
    name: string;
    id: string;
    boards?: string[];
    settings?: {
        background: string;
    };
}
export interface Board {
    id: string;
    name: string;
    order: number;
    projectId: string;
    issues: Issue[];
}
export enum IssueStatus {
    Passive,
    Active,
    Arhived,
}
export interface Issue {
    id: string;
    title: string;
    description: string;
    order: number;
    boardId: string;
    status: IssueStatus;
}
export interface Timestamp {
    id: string;
    issueId: string;
    startTime: Date;
    endTime: Date | 'null';
}

const baseUrl = 'http://localhost:3010';

export const useProjects = () => {
    const { data, error } = useSWR<Project[], Error>(`/projects/`, fetcher);
    return { projects: data, isLoading: !error && !data, isError: error };
};

export const useBoards = (id: string) => {
    const { data, error } = useSWR<Board[], Error>(`/boards/`, async () => await fetcher<Board[]>(`/boards?projectId=${id}&_embed=issues`));
    return { boards: data?.map((board) => ({ ...board, issues: board.issues?.sort((a, b) => a.order - b.order) })).sort((a, b) => a.order - b.order), isLoading: !error && !data, isError: error };
};

const fetcher = async <T>(slug: string) => {
    const res = await fetch(`${baseUrl}${slug}`);
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    const data = await (res.json() as Promise<T>);
    return data;
};

export const insertAPI = async <T>(slug: string, data: any) => {
    const res = await fetch(`${baseUrl}${slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    const result = await (res.json() as Promise<T>);
    return result;
};

export const updateAPI = async <T>(slug: string, data: any) => {
    const res = await fetch(`${baseUrl}${slug}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    const result = await (res.json() as Promise<T>);
    return result;
};

export const updateIssueOrder = async (id: string, order: number, from: string, to: string) => {
    let increments = [];
    let decrements = [];
    if (from === to) {
        const issues = await fetcher<Issue[]>(`/issues?boardId=${from}`);
        const oldIssue = issues.find((issue) => issue.id === id);
        increments = issues.filter((issue) => issue.order >= order && issue.id !== id);
        decrements = issues.filter((issue) => issue.order < order && issue.order > (oldIssue?.order ?? 0) && issue.id !== id);
    } else {
        increments = await fetcher<Issue[]>(`/issues?boardId=${to}&order_gte=${order}`);
        decrements = from === to ? await fetcher<Issue[]>(`/issues?boardId=${from}&order_gte=${order}`) : [];
    }
    const promises = [];
    increments.forEach((issue) => promises.push(updateAPI<Issue>(`/issues/${issue.id}`, { order: issue.order + 1 })));
    decrements.forEach((issue) => promises.push(updateAPI<Issue>(`/issues/${issue.id}`, { order: issue.order - 1 })));
    promises.push(updateAPI<Issue>(`/issues/${id}`, { order, boardId: to }));
    await Promise.all(promises);
};

export const updateBoardOrder = async (projectId: string, id: string, order: number) => {
    const boards = await fetcher<Board[]>(`/boards?projectId=${projectId}`);
    const oldBoard = boards.find((board) => board.id === id);
    const increments = boards.filter((board) => board.order >= order && board.id !== id);
    const decrements = boards.filter((board) => board.order < order && board.order > (oldBoard?.order ?? 0) && board.id !== id);
    const promises = [];
    increments.forEach((board) => promises.push(updateAPI<Board>(`/boards/${board.id}`, { order: board.order + 1 })));
    decrements.forEach((board) => promises.push(updateAPI<Board>(`/boards/${board.id}`, { order: board.order - 1 })));
    promises.push(updateAPI<Board>(`/boards/${id}`, { order }));
    await Promise.all(promises);
};

export const deleteAPI = async <T>(slug: string, updateSlug: string) => {
    const res = await fetch(`${baseUrl}${slug}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    return await fetcher<T>(updateSlug);
};

export const deleteProject = async (id: string) => {
    const boards = (await fetcher<{ boards: Board[] }>(`/projects/${id}?_embed=boards`)).boards ?? [];
    const promises = [];
    promises.push(fetch(`${baseUrl}/projects/${id}`, { method: 'DELETE' }));
    boards.forEach((board) => promises.push(fetch(`${baseUrl}/boards/${board.id}?_embed=issues`, { method: 'DELETE' })));
    await Promise.all(promises);
    return await fetcher<Project[]>(`/projects/`);
};

export const useTime = (issueId: string) => {
    const { data, error } = useSWR<Timestamp[], Error>(`/timestamps?issueId=${issueId}`, fetcher);
    return { times: data, isLoading: !error && !data, isError: error };
};

export const pauseTime = async (issueId: string) => {
    const time = (await fetcher<Timestamp[]>(`/timestamps?issueId=${issueId}&endTime=null`))[0];
    console.log(time);
    const newTime = await updateAPI<Timestamp>(`/timestamps/${time.id}`, { endTime: new Date() });
    return newTime;
};
interface BoardSummary {
    boardId: string;
    total: number;
    issues: {
        issueId: string;
        time: number;
        timestamps: Timestamp[];
    }[];
}
const fetchProjectTimes = async (projectId: string) => {
    const boards = await fetcher<Board[]>(`/boards?projectId=${projectId}&_embed=issues`);
    const summary: BoardSummary[] = [];
    await Promise.all(
        boards.map(async (board) => {
            const issues = board.issues ?? [];
            let total = 0;
            const issueTimestamps: { issueId: string; time: number; timestamps: Timestamp[] }[] = [];
            (
                await Promise.allSettled(
                    issues.map(async (issue) => {
                        const timestamps = (await fetcher<Timestamp[]>(`/timestamps?issueId=${issue.id}`)) ?? [];
                        const time = timestamps.reduce((acc, timestamp) => acc + ((timestamp.endTime === 'null' ? new Date() : new Date(timestamp.endTime)).getTime() - new Date(timestamp.startTime).getTime()) / 1000 / 60, 0);
                        return { issueId: issue.id, time, timestamps };
                    })
                )
            ).forEach((result) => {
                const { issueId, time, timestamps } = result.status === 'fulfilled' ? result.value : { issueId: '', time: 0, timestamps: [] };
                issueTimestamps.push({ issueId, time, timestamps });
                total += time;
            });
            summary.push({ boardId: board.id, total, issues: [...issueTimestamps] });
        })
    );
    console.log(summary);
    return summary;
};

export const useSummary = (projectId: string) => {
    const { data, error } = useSWR<BoardSummary[], Error>('summary', () => fetchProjectTimes(projectId));
    return { summary: data, isLoading: !error && !data, isError: error };
};
