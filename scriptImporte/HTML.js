function renderColorPicker(){
    return `<div class="color-picker-box" onclick="takeColor('var(--color-picker-1)')"
    style="background-color: var(--color-picker-1);">
</div>
<div class="color-picker-box" onclick="takeColor('var(--color-picker-2)')"
    style="background-color: var(--color-picker-2);">
</div>
<div class="color-picker-box" onclick="takeColor('var(--color-picker-3)')" style="background-color: var(--color-picker-3);">
</div>
<div class="color-picker-box" onclick="takeColor('var(--color-picker-4)')"
    style="background-color: var(--color-picker-4);"></div>
<div class="color-picker-box" onclick="takeColor('var(--color-picker-5)')"
    style="background-color: var(--color-picker-5);"></div>
<div class="color-picker-box" onclick="takeColor('var(--color-picker-6)')"
    style="background-color: var(--color-picker-6);"></div>`
}