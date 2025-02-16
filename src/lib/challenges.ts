import { supabase } from "./supabase";

export async function getChallenges() {
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { challenges: data, error: null };
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return { challenges: null, error };
  }
}

export async function submitChallenge(challengeId: string, content: string) {
  try {
    const { data, error } = await supabase
      .from("challenge_submissions")
      .insert([
        {
          challenge_id: challengeId,
          content,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { submission: data, error: null };
  } catch (error) {
    console.error("Error submitting challenge:", error);
    return { submission: null, error };
  }
}

export async function getUserSubmissions(userId: string) {
  try {
    const { data, error } = await supabase
      .from("challenge_submissions")
      .select(
        `
        *,
        challenge:challenges(*)
      `,
      )
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return { submissions: data, error: null };
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    return { submissions: null, error };
  }
}

export async function voteOnSubmission(submissionId: string, score: number) {
  try {
    const { data, error } = await supabase
      .from("submission_votes")
      .insert([
        {
          submission_id: submissionId,
          score,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { vote: data, error: null };
  } catch (error) {
    console.error("Error voting on submission:", error);
    return { vote: null, error };
  }
}
