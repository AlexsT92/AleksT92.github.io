const slider = document.querySelector('.slider');
    const handle = document.querySelector('.handle');
    const valueDisplay = document.querySelector('.value');
    const ticksContainer = document.querySelector('.ticks');
    const filled = document.querySelector('.filled');
    
    const minValue = 0; // Минимальное значение слайдера
    const maxValue = 100; // Максимальное значение слайдера
    const numTicks = 41; // Количество делений
    
    let isDragging = false;
    handle.addEventListener('mousedown', startDragging);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('mousemove', dragHandle);
 
    function startDragging(e) {
      isDragging = true;
      handle.style.cursor = 'grabbing';
      slider.classList.add('dragging');
    }
    function stopDragging(e) {
      if (isDragging) {
        isDragging = false;
        handle.style.cursor = 'grab';
        slider.classList.remove('dragging');
      }
    }
    function dragHandle(e) {
      if (isDragging) {
        const sliderRect = slider.getBoundingClientRect();
        const handleRect = handle.getBoundingClientRect();
        const sliderWidth = slider.offsetWidth;
        const handleWidth = handle.offsetWidth;
 
        let leftPosition = e.clientX - sliderRect.left - handleWidth / 2;
        leftPosition = Math.max(-handleWidth / 2, Math.min(leftPosition, sliderWidth - handleWidth / 2));
 
        const value = Math.round((leftPosition + handleWidth / 2) / (sliderWidth - handleWidth) * (maxValue - minValue));
        valueDisplay.textContent = value > maxValue ? maxValue : value;
        
        handle.style.left = leftPosition + 'px';
        filled.style.width = leftPosition + handleWidth / 2 + 'px';
        updateTicks(leftPosition, sliderWidth, handleWidth, color);
      }
    }
        function generateTicks() {
        const tickSize = slider.offsetWidth / numTicks;
        for (let i = 0; i <= numTicks; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        tick.style.left = i * tickSize + 'px';
        ticksContainer.appendChild(tick);
      }
    }
    function updateTicks(handlePosition, sliderWidth, handleWidth, color) {
      const tickSize = sliderWidth / numTicks;
      const filledTicks = Math.floor(handlePosition / tickSize);
        while (ticksContainer.firstChild) {
        ticksContainer.removeChild(ticksContainer.firstChild);
      }
    generateTicks();
    const tickElements = ticksContainer.querySelectorAll('.tick');
        for (let i = filledTicks + 1; i <= numTicks; i++) {
        tickElements[i].style.backgroundColor = '#999';
      }
       for (let i = 0; i <= filledTicks; i++) {
        tickElements[i].style.backgroundColor = color;
      }
    }
    generateTicks();