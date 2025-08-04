type Exercise = {
    name: string,
    id: string
}

export type WorkingSet = {
    index: number,
    reps: number,
    weight: number,
}

export type WorkoutExercise = {
    workout_exercise_id: string,
    exercise_name: string,
    number_of_sets: number,
    rest_time_in_seconds: number,
    working_sets: WorkingSet[]
}

enum SplitType{
    Fullbody = 1,
    UpperLower = 2,
    PushPullLegs = 3,
}

type WorkoutExerciseOld = {
    id: string,
    numberOfSets: number,
    restTimeInSeconds: number,
    exerciseId: string,
    workoutId: string,
}

export type WorkoutSession = {
    scheduledAt?: string,
    startedAt?: string,
    endetAt?: string,
    status: "planned" | "completed",
    workoutId: string,
}

type Workout = {
    id: string
    name: string,
}

type ScheduledWorkout = {
    startTime?: Date;
    endTime?: Date;
    scheduledTime?: Date,
    status: "done" | "toBeDone",
    workout: Workout
}

type WorkoutSplit = {
    name: string,
    splitType: SplitType,
    workouts: Workout[]
}

export {
    Exercise, ScheduledWorkout, SplitType, Workout, WorkoutExerciseOld, WorkoutSplit
}
