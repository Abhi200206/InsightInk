const Icon=()=>{

    return (
        <div className="cursor-pointer">
            <div className="ml-4 my-2 rounded border-[1px] px-2">
                <div className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
                <p className="font-black text-slate-600">Posts</p>
                </div>
            </div>
        </div>
    )
}
export default Icon