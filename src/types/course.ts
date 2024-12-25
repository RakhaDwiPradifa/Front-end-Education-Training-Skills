export interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  instructor: string;
  category: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  image_url: string;
  duration: string;
  level: string;
  price: number;
  instructor: string;
  category: string;
  status: string;
}