$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression

$root = "C:\Users\XSENSEI\Pictures\Happy Birthday"
$assets = "$root\birthday-site\public\assets"

New-Item -ItemType Directory -Path "$assets\teddy","$assets\teddy\static","$assets\cats","$assets\misc" -Force | Out-Null

# 1) Teddy animated webps (16)
Copy-Item "$root\stickers\mikasa-teddy\webp\7366252260\*.webp" "$assets\teddy\" -Force
Write-Output "teddy webps: $((Get-ChildItem "$assets\teddy\*.webp").Count)"

# 2) Static transparent PNGs (fallback / print-quality poses)
Copy-Item "$root\stickers\mikasa-teddy\png\7366252260\*.png" "$assets\teddy\static\" -Force
Write-Output "teddy pngs: $((Get-ChildItem "$assets\teddy\static\*.png").Count)"

# 3) Favicon from first webp
Copy-Item "$assets\teddy\0.webp" "$assets\misc\favicon.webp" -Force

# 4) A few pookie webps as decorative extras (first 12)
$pookie = Get-ChildItem "$root\stickers\pookie\webp\7366252260\*.webp" | Select-Object -First 12
$i = 0
foreach ($p in $pookie) { Copy-Item $p.FullName "$assets\misc\deco-$i.webp" -Force; $i++ }
Write-Output "decorations: $i"

# 5) Cats: gunzip 8 chosen .tgs -> semantic .json for lottie-web
function Gunzip([string]$inPath, [string]$outPath) {
  $inFs  = [System.IO.File]::OpenRead($inPath)
  $gz    = New-Object System.IO.Compression.GZipStream($inFs, [System.IO.Compression.CompressionMode]::Decompress)
  $outFs = [System.IO.File]::Create($outPath)
  $gz.CopyTo($outFs)
  $outFs.Dispose(); $gz.Dispose(); $inFs.Dispose()
}

$catMap = @{ "smug"=0; "suspicious"=1; "sleepy"=2; "dramatic"=3; "cute"=4; "judging"=5; "shocked"=6; "party"=7 }
foreach ($name in $catMap.Keys) {
  $src = "$root\stickers\cat-pack\tgs\7366252260\$($catMap[$name]).tgs"
  $dst = "$assets\cats\$name.json"
  Gunzip $src $dst
  $head = (Get-Content $dst -TotalCount 1 -Encoding UTF8).Substring(0, [Math]::Min(60, (Get-Item $dst).Length))
  $size = [Math]::Round((Get-Item $dst).Length / 1KB, 1)
  Write-Output "cat $name <- $($catMap[$name]).tgs -> ${size}KB starts: $head"
}

Write-Output "DONE"
