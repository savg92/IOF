type User = {
	id?: number;
	name?: string | null;
	lastname?: string | null;
	email?: string;
	password?: string;
	createAt?: string;
	updateAt?: string;
};

type Project = {
	id?: number;
	name?: string;
	description?: string;
	authorId?: number;
	createAt?: string;
	updateAt?: string;
};

type Task = {
	id?: number;
	title?: string;
	description?: string;
	status?: Status;
	projectId?: number;
	createAt?: string;
	updateAt?: string;
};

enum Status {
	PENDING,
	COMPLETE,
}

type TaskCollaborator = {
	taskId?: number;
	userId?: number;
	createAt?: string;
	updateAt?: string;
};

export type { User, Project, Task, Status, TaskCollaborator };
