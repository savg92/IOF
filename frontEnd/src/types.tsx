type User = {
	id?: number;
	name?: string | null;
	lastname?: string | null;
	email?: string;
	password?: string;
	createdAt?: string;
	updatedAt?: string;
};

type Project = {
	id?: number;
	name?: string;
	description?: string;
	authorId?: number;
	createdAt?: string;
	updatedAt?: string;
};

type Task = {
	id?: number;
	title?: string;
	description?: string;
	status?: Status | string;
	projectId?: number;
	createdAt?: string;
	updatedAt?: string;
};

enum Status {
	PENDING,
	COMPLETE,
}

type TaskCollaborator = {
	taskId?: number;
	userId?: number;
	createdAt?: string;
	updatedAt?: string;
};

export type { User, Project, Task, Status, TaskCollaborator };
