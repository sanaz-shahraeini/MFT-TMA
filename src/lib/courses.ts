import { supabase } from "./supabase";

export async function getCourses() {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { courses: data, error: null };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { courses: null, error };
  }
}

export async function registerForCourse(courseId: string) {
  try {
    const { data, error } = await supabase
      .from("course_registrations")
      .insert([{ course_id: courseId }])
      .select()
      .single();

    if (error) throw error;
    return { registration: data, error: null };
  } catch (error) {
    console.error("Error registering for course:", error);
    return { registration: null, error };
  }
}

export async function getUserCourses() {
  try {
    const { data, error } = await supabase
      .from("course_registrations")
      .select(
        `
        *,
        course:courses(*)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { registrations: data, error: null };
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return { registrations: null, error };
  }
}
