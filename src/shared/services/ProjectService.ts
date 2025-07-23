import { BaseService } from './BaseService';
import { IProject, IListResponse, ProjectStatus } from '@models/index';
import { APP_CONSTANTS } from '@constants/index';
import { sp } from '@pnp/sp/presets/all';

export class ProjectService extends BaseService {
  private readonly listName = APP_CONSTANTS.LISTS.PROJECTS;

  public async getProjects(pageSize: number = APP_CONSTANTS.UI.PAGE_SIZE): Promise<IListResponse<IProject>> {
    return this.executeWithRetry(async () => {
      const items = await sp.web.lists
        .getByTitle(this.listName)
        .items
        .select('Id', 'Title', 'Description', 'Status', 'Created', 'Modified', 'AssignedTo/Title', 'Priority')
        .expand('AssignedTo')
        .top(pageSize)
        .orderBy('Modified', false)
        .get();

      const projects: IProject[] = items.map(item => ({
        id: item.Id.toString(),
        title: item.Title,
        description: item.Description,
        status: item.Status as ProjectStatus,
        createdDate: new Date(item.Created),
        modifiedDate: new Date(item.Modified),
        assignedTo: item.AssignedTo?.Title,
        priority: item.Priority
      }));

      return {
        data: projects,
        success: true,
        totalCount: projects.length,
        hasMore: projects.length === pageSize,
        timestamp: new Date()
      };
    }) as Promise<IListResponse<IProject>>;
  }

  public async getProjectById(id: string): Promise<IProject | null> {
    const response = await this.executeWithRetry(async () => {
      const item = await sp.web.lists
        .getByTitle(this.listName)
        .items
        .getById(parseInt(id))
        .select('Id', 'Title', 'Description', 'Status', 'Created', 'Modified', 'AssignedTo/Title', 'Priority')
        .expand('AssignedTo')
        .get();

      return {
        id: item.Id.toString(),
        title: item.Title,
        description: item.Description,
        status: item.Status as ProjectStatus,
        createdDate: new Date(item.Created),
        modifiedDate: new Date(item.Modified),
        assignedTo: item.AssignedTo?.Title,
        priority: item.Priority
      } as IProject;
    });

    return response.success ? response.data : null;
  }

  public async createProject(project: Omit<IProject, 'id' | 'createdDate' | 'modifiedDate'>): Promise<IProject | null> {
    const response = await this.executeWithRetry(async () => {
      const result = await sp.web.lists
        .getByTitle(this.listName)
        .items
        .add({
          Title: project.title,
          Description: project.description,
          Status: project.status,
          Priority: project.priority
        });

      return await this.getProjectById(result.data.Id.toString());
    });

    return response.success ? response.data : null;
  }

  public async updateProject(id: string, updates: Partial<IProject>): Promise<boolean> {
    const response = await this.executeWithRetry(async () => {
      await sp.web.lists
        .getByTitle(this.listName)
        .items
        .getById(parseInt(id))
        .update({
          Title: updates.title,
          Description: updates.description,
          Status: updates.status,
          Priority: updates.priority
        });

      return true;
    });

    return response.success;
  }

  public async deleteProject(id: string): Promise<boolean> {
    const response = await this.executeWithRetry(async () => {
      await sp.web.lists
        .getByTitle(this.listName)
        .items
        .getById(parseInt(id))
        .delete();

      return true;
    });

    return response.success;
  }
}

// Singleton instance
export const projectService = new ProjectService();
