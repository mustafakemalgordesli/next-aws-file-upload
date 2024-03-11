"use server"

import { revalidatePath } from "next/cache";
import uploadImage from "@/lib/upload-image";

export async function Upload(formData: FormData) {
    const file = formData.get("image") as File
    const response = await uploadImage({ file });
    if (!response || response?.result.$metadata.httpStatusCode != 200) {
        return {
            error: "Image not uploaded",
        };
    }
    revalidatePath("/");
    return {
        error: "",
    };
}