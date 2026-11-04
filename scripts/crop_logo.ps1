Add-Type -AssemblyName System.Drawing

$srcPath = "D:\bricksBazar\public\brand\logo.png"
$dstPath = "D:\bricksBazar\public\brand\logo-header.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        # Check if pixel is not transparent and not pure white
        if ($c.A -gt 20 -and ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"

# Add 20px padding
$pad = 20
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

Write-Output "Cropping to: $cropX, $cropY, width=$cropW, height=$cropH"

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$cropped.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)

$cropped.Dispose()
$bmp.Dispose()

Write-Output "Saved cropped logo to $dstPath"

