import { Exercise, Workout } from '@/models/trainingModels';
import { supabase } from './supabase';

export const queryAllExercises = async (): Promise<Exercise[]> => {
    const res = await supabase.from("exercises").select("id,created_at,name");

    if (res.error) {

        console.log(`error while fetching all available exercises: ${JSON.stringify(res.error, null, 2)}`);
    }

    if (!res.data) return [];

    return res.data.map((exercise) => ({ id: exercise.id, name: exercise.name }));
}

export const queryAllWorkoutsFromCurrentUser = async (): Promise<Workout[]> => {
    const res = await supabase.from("workouts").select("id,name");

    if (res.error) {
        console.log(`error while fetching all workouts from user: ${JSON.stringify(res.error, null, 2)}`);
    }

    if (!res.data) return [];

    return res.data.map((workout) => ({ id: workout.id, name: workout.name}));
}

export type WorkoutSessionInfo = {
    workout_session_id: string,
    scheduled_at: string,
    started_at: string,
    ended_at: string,
    status: string,
    workout_id: string,
    workout_name: string,
} 

export const queryWorkoutsFromDate = async (date: Date): Promise<WorkoutSessionInfo[]> => {
    const dateOnly = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]; // get date in format "YYYY-MM-DD";
    const res = await supabase.rpc("get_workout_sessions_from_date",{ target_date: dateOnly}).select();
    
    if (res.error) {
        console.log(`error while queryWorkoutsFromDate: ${JSON.stringify(res.error, null, 2)}`);
    }

    return res.data ?? [];
}

export const queryWorkoutsFromCurrentMonth = async (date: Date): Promise<WorkoutSessionInfo[]> => {
    const dateOnly = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]; // get date in format "YYYY-MM-DD";
    const res = await supabase.rpc("get_workout_sessions_current_month",{ target_date: dateOnly}).select();

   if (res.error) {
        console.log(`error while queryWorkoutsFromCurrentMonth: ${JSON.stringify(res.error, null, 2)}`);
    }

    return res.data ?? [];
}

export type ExerciseDetails = {
    exercise_name: string,
    number_of_sets: number,
    rest_time_in_seconds: number,
};

export type WorkoutDetails = {
    workout_id: string,
    workout_name: string,
    exercises: ExerciseDetails[]
}

export const queryWorkoutsWithExerciseDetails = async (): Promise<WorkoutDetails[]> => {
    const res = await supabase.rpc("get_workout_exercise_details");

    if(res.error) throw res.error;

    return res.data;
}

export type ExerciseData = {
    executed_at: string,
    total_volume: number,
}

export const getExerciseDataByName = async (exerciseName: string) : Promise<ExerciseData[]> => {
    const res = await supabase.rpc("get_exercise_data_by_name",{exercise_name: exerciseName});

    if(res.error) throw res.error;

    return res.data;
}

export type ExerciseInfo = {
    session_exercise_id: string,
    exercise_name: string,
    number_of_sets: number,
    rest_time_in_seconds: number,
}

export const queryWorkoutSessionExercisesInfo = async (targetWorkoutSessionId: string): Promise<ExerciseInfo[]> => {
    const res = await supabase.rpc("get_workout_session_data_from_id",{target_workout_session_id: targetWorkoutSessionId}).select();
    
    return res.data ?? [];
}