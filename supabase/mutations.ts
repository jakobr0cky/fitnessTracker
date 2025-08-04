import { supabase } from "./supabase";

export const upsertWorkout = async ({ workoutName, userId }: { workoutName: string, userId: string }) => {

    const res = await supabase.from("workouts").upsert(
        {
            name: workoutName,
            profile_id: userId
        },
        {
            onConflict: "name"
        }
    ).select();

    if (res.error) throw res.error; // have to throw the error, so react query can react on it

    return res.data?.[0] ?? [];
}

export const insertWorkoutExercise = async ({ numberOfSets, restTimeInSeconds, exerciseId, workoutId }: { numberOfSets: number, restTimeInSeconds: number, exerciseId: string, workoutId: string }) => {
    const res = await supabase.from("workout_exercises").insert([
        {
            number_of_sets: numberOfSets,
            rest_time_in_seconds: restTimeInSeconds,
            exercise_id: exerciseId,
            workout_id: workoutId
        }
    ]).select();

    if (res.error) throw res.error; // have to throw the error, so react query can react on it

    return res.data?.[0] ?? [];
}

export const insertWorkoutSession = async ({ workoutId, scheduled_at }: { workoutId: string, scheduled_at: Date }) => {
    const res = await supabase.from("workout_sessions").insert([{ workout_id: workoutId, scheduled_at: scheduled_at }]).select();

    if (res.error) throw res.error;

    return res.data?.[0] ?? [];
}

export const updateWorkoutSession = async ({ workout_session_id, started_at, ended_at, status }: { workout_session_id: string, started_at: Date, ended_at: Date, status: "planned" | "completed" }) => {
    const res = await supabase.from("workout_sessions").update({
        started_at: started_at,
        ended_at: ended_at,
        status: status
    }).eq("id", workout_session_id).select();

    if (res.error) throw res.error;

    return res.data?.[0] ?? [];
}

export const upsertWorkingSets = async ({workingSets}:{workingSets:{session_exercise_id: string,reps: number, weight: number, index: number}[]}) => {
    const res = await supabase.from("working_sets").upsert(workingSets).select();

    console.log(`upsertWorkingSets res: ${JSON.stringify(res,null,2)}`)

    if(res.error) throw res.error;

    return res.data ?? [];
}