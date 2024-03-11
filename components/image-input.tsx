'use client';
import { Upload } from "@/action/upload";

export default function ImageInput() {
    const loadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        const inputElement = event.target as HTMLInputElement;
        const imageElement = document.getElementById('file') as HTMLImageElement;

        if (inputElement.files && inputElement.files[0]) {
            const file = inputElement.files[0];
            imageElement.src = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append('image', file);

            await Upload(formData)
        }
    };

    return (
        <div className="h-[165px] w-[165px]">
            <input
                id="file"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={loadFile}
            />
        </div>
    );
}