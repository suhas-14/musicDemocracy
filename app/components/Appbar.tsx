"use client"; //This helps the signin function only renders on client

import { signIn, signOut, useSession } from "next-auth/react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppBar() {
    const session = useSession();
    
    return <div className="flex justify-between">    
        <div className="flex items-center gap-2 p-2">
            <Music className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold flex flex-col justify-center">MusicDemocracy</span> 
            
        </div>
        <div className="flex items-center gap-2 p-2">
            {!session.data?.user && <Button className="m-2 p-2" onClick={() => signIn()}>Sign In</Button>}
            {session.data?.user && <Button className="m-2 p-2" onClick={() => signOut()}>Sign Out</Button>}
        </div>

    </div>
}