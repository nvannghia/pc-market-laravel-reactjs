<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait StorageImageTrait
{
    public function storageTraitUpload($request, $fileName, $folderName)
    {
        if ($request->hasFile($fileName)) {
            $file = $request->$fileName;
            $fileNameOrigin = $file->getClientOriginalName();
            $fileNameHash = Str::random(20) . "." . $file->getClientOriginalExtension(); // this name for insert into db

            $filePath = $request->file($fileName)->storeAs(
                'public/' . $folderName . "/" . auth()->id(),
                $fileNameHash
            );
            $filePathStorage = Storage::url($filePath);

            return  $filePathStorage;
        }
        return null;
    }
}
