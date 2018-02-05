function Menu(options) {
    var elem;  // root element
    var hideTimer; // timer for hidding

    function getElem() {
      if (!elem) render();
      return elem;
    }
    /*
      create root element and add event handlers
  */
    function render() {
      elem = document.createElement('div');
      elem.className = "menu";
  
      var titleElem = document.createElement('span');
      elem.appendChild(titleElem);
      titleElem.className = "menu__title";
      titleElem.textContent = options.title;
  
      elem.onmousedown = function() {
        return false;
      };
      

      elem.onmouseover = function(event) {
        if (event.target.closest('.menu__title')) {
          open();
        }
        if (event.target.closest('li')) {
          clearTimeout(hideTimer);
        }
        
      }

      elem.onmouseout = function(event){
        if (event.target.closest('.menu__title')) {
          hideTimer = setTimeout(function(){close()},300);
        }
      }
  
    }
  /*
    create drop-dowm list
    and we will place it depending on the free space
  */
    function renderItems() {
      var items = options.items || [];
      var list = document.createElement('ul');
      items.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });

      elem.appendChild(list);

      // define the current coordinates

      var coords = elem.getBoundingClientRect();
      var left = coords.left + (elem.offsetWidth - list.offsetWidth) / 2;

      if (left < 0) left = 0; 
      var top = coords.top - list.offsetHeight + 20;
      
      if (top < 0) { 
        top = coords.top + elem.offsetHeight - 20;
      }
      list.style.left = left + 'px';
      list.style.top = top + 'px';
      
    }
  
    function open() {
      if (!elem.querySelector('ul')) {
        renderItems();
      }
      elem.classList.add('open');
      elem.classList.add('tooltip');

    };
  
    function close() {
      elem.classList.remove('open');
      elem.classList.add('tooltip');
    };
  
    function toggle() {
      if (elem.classList.contains('open')) close();
      else open();
    };
  
    // make the methods public
    this.getElem = getElem;
    this.close = close;
    this.open = open;
  }