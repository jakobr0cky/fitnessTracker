import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionStore = {
    session: Session | null
    setSession: (session: Session) => void
    deleteSession: () => void
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            session: null,
            setSession(session) {
                set(({session:session}));
            },
            deleteSession(){
                set(({session:null}))
            }
        }),
         ({
            name: "SessionStorage",
            storage: createJSONStorage(() => AsyncStorage),
        })
    )
)