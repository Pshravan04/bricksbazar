Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('D:\bricksBazar\public\brand\logo.png')

$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 798; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 50 -and $c.R -gt 140 -and $c.G -lt 100 -and $c.B -lt 100) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Exact circle mark bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"

$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$cropped.Save('D:\bricksBazar\public\brand\logo-mark.png', [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$bmp.Dispose()
Write-Output "Saved pure logo-mark.png: $cropW x $cropH"
