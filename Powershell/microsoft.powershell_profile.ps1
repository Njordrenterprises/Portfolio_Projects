
Set-Location C:\Users\njord\Documents\CodeHub
Set-Alias lvim 'C:\Users\njord\.local\bin\lvim.ps1'
oh-my-posh init pwsh | Invoke-Expression

#----> Directory assistant aliases
function Set-RustProjects {
    Set-Location C:\Users\njord\Documents\CodeHub\Portfolio_Projects\rust_projects\activities\src\bin
    Get-ChildItem | Format-Wide -Column 3 
}
Set-Alias zrust Set-RustProjects


function Set-JavaScriptProjects {
    Set-Location C:\Users\njord\Documents\CodeHub\Portfolio_Projects\javascript_projects
    Get-ChildItem
}
Set-Alias zjs Set-JavaScriptProjects

function Set-Deno {
    Set-Location C:\Users\njord\Documents\CodeHub\Portfolio_Projects\javascript_projects
    Get-ChildItem
}
Set-Alias zdeno Set-Deno

function Set-CodeHub {
    Set-Location C:\Users\njord\Documents\CodeHub
    Get-ChildItem
}
Set-Alias zhub Set-CodeHub 

function Set-TypeScript {
    Set-Location C:\Users\njord\Documents\CodeHub\Portfolio_Projects\typescript_projects
    Get-ChildItem
}
Set-Alias ztype Set-TypeScript

#-------> Create scratch file 
function Set-RustScratch {
    Set-Location C:\Users\njord\Documents\CodeHub\Portfolio_Projects\scratch\rust\src\bin
    Get-ChildItem
}
Set-Alias zscratch_rust Set-RustScratch 
# add list all files in directory replacing cd alias
function CustomCd {
    param(
        [string]$Path
    )

    # Change directory
    Set-Location $Path

    # List the contents of the directory
    Get-ChildItem | Format-Wide -Column 3
}
# --------> ALIAS CHANGES 
# Remove the existing 'cd' alias
if (Get-Alias -Name cd -ErrorAction SilentlyContinue) {
    Remove-Item alias:cd
}
# Create a new 'cd' alias for the CustomCd function
Set-Alias -Name cd -Value CustomCd

# # Remove the existing 'ls' alias
# if (Get-Alias -Name ls -ErrorAction SilentlyContinue) {
#     Remove-Item alias:ls
# }
#Create a new alias for ls
Set-Alias -Name ls -Value Get-ChildItem | Format-Wide -Column 2

# Create an alias for lvim to z
Set-Alias -Name z -Value lvim

#------>function to create a new rust scratch file and open in lvim
function New-RustScratchFile {
    $FileName = Read-Host -Prompt "Enter the filename"

    $fullPath = "C:\Users\njord\Documents\CodeHub\Portfolio_Projects\scratch\rust\src\bin\$FileName"

    if (-Not (Test-Path $fullPath)) {
        New-Item -Path $fullPath -ItemType "file"
    } else {
        Write-Host "File already exists. Opening existing file."
    }

    lvim $fullPath
}

Set-Alias -Name scratch rust -Value New-RustScratchFile

#
function New-TsScratchFile {
    $FileName = Read-Host -Prompt "Enter the filename"

    $fullPath = "C:\Users\njord\Documents\CodeHub\Portfolio_Projects\scratch\typescript\$FileName"

    if (-Not (Test-Path $fullPath)) {
        New-Item -Path $fullPath -ItemType "file"
    } else {
        Write-Host "File already exists. Opening existing file."
    }

    lvim $fullPath
}

Set-Alias -Name scratch typescript -Value New-TsScratchFile


