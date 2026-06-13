import {useState} from "react";
import {EyeIcon,EyeSlashIcon} from "@heroicons/react/16/solid";


export const PassphraseField = (({passphrase} : {passphrase:string}) => {
    const [shown, setShown] = useState<boolean>(true);
    return (
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/15 bg-base-200/60 px-3 py-2.5">
            <input
                id="passphrase"
                value={passphrase}
                className="w-full border-0 bg-transparent font-mono text-sm outline-none"
                readOnly={true}
                type={shown ? "text" : "password"}
            />
            <button
                type="button"
                aria-label={shown ? "Hide passphrase" : "Show passphrase"}
                onClick={() => setShown((v) => !v)}
                className="shrink-0 text-neutral-content transition hover:text-primary cursor-pointer"
            >
                {shown ? <EyeIcon className="w-5" /> : <EyeSlashIcon className="w-5" />}
            </button>
        </div>
    )
})
