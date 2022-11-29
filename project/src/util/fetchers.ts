import useSWR from 'swr';

export interface Project {
    name: string;
    id: string;
    boards?: string[];
}
export interface Board {
    name: string;
    id: string;
    projectId: string;
    issues: Issue[];
}
export interface Issue {
    content: string;
    id: string;
    boardId: string;
}

const baseUrl = 'http://localhost:3010';

export const useProjects = () => {
    const { data, error } = useSWR<Project[], Error>(`/projects/`, fetcher);
    return { projects: data, isLoading: !error && !data, isError: error };
};

export const useBoards = (id: string) => {
    const { data, error } = useSWR<Board[], Error>(`/boards/`, async () => await fetcher<Board[]>(`/boards?projectId=${id}&_embed=issues`));
    return { boards: data, isLoading: !error && !data, isError: error };
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
