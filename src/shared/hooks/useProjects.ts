import { useState, useEffect, useCallback } from 'react';
import { IProject, IListResponse } from '@models/index';
import { projectService } from '@services/ProjectService';

export interface UseProjectsResult {
  projects: IProject[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useProjects = (pageSize: number = 20): UseProjectsResult => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const loadProjects = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await projectService.getProjects(pageSize);
      
      if (response.success) {
        setProjects(reset ? response.data : [...projects, ...response.data]);
        setTotalCount(response.totalCount);
        setHasMore(response.hasMore);
      } else {
        setError(response.error || 'Failed to load projects');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [pageSize, projects]);

  const refresh = useCallback(() => loadProjects(true), [loadProjects]);
  const loadMore = useCallback(() => loadProjects(false), [loadProjects]);

  useEffect(() => {
    loadProjects(true);
  }, []);

  return {
    projects,
    loading,
    error,
    totalCount,
    hasMore,
    refresh,
    loadMore
  };
};
