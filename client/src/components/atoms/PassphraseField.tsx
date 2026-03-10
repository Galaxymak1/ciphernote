import {useState} from "react";
import {EyeIcon,EyeSlashIcon} from "@heroicons/react/16/solid";


export const PassphraseField = (({passphrase} : {passphrase:string}) => {
    const [shown, setShown] = useState<boolean>(true);
    return (
        <div className="inline-flex items-center border border-neutral gap-2 rounded-lg p-2">
            <input id="passphrase" value={passphrase} className={"resize-none border-0 outline-0 min-w-xs"}  readOnly={true} type={shown ? "text" : "password"}></input>
            {
                shown ? <EyeIcon onClick={() => setShown(false)}  className={"w-6"}/>
                : <EyeSlashIcon  onClick={() => setShown(true)} className={"w-6"}/>
            }
        </div>
    )
})