var hideTimer;

function showMenu(event){
    var target = event.target;
    /* if menu does'nt exist, сreate it and set position  */
    if (target.classList.contains('open')) 
      return;
    var menu = document.createElement('div');

    renderMenu();
    setPosition();
    target.classList.add('open');

    /* add events to catch the mouse */

    menu.addEventListener('mouseout',closeMenu);
    target.onmouseout = closeMenu;
    menu.addEventListener('mouseover',keepMenu);

    /* create menu from array*/
    function renderMenu() {
      var ul = document.createElement('ul')
      menuText.forEach(function(item) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.text = item;
        li.appendChild(a);
        ul.appendChild(li);
      });
      menu.appendChild(ul);
      document.body.appendChild(menu);
      menu.classList.add('contextMenu');
    };

    /* calculate position and set it*/
    function setPosition(){
      var coords = target.getBoundingClientRect();
      var left = coords.left;
      var top = coords.top + target.offsetHeight + 5;
      var bottom = coords.top + target.offsetHeight + menu.offsetHeight ;
      if (bottom > document.documentElement.clientHeight ) { 
        top = coords.top - menu.offsetHeight - 5;
      }
      if (top < 0) {
        top = coords.top + target.offsetHeight/2 - menu.offsetHeight/2;
        left = coords.left - menu.offsetWidth - 5;
      }
      if (left < 0) {
        left = coords.left + target.offsetWidth + 5;
      }
      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
    }   

    /* event handlers */
    function keepMenu(){
      console.log('keepMenu timer' + hideTimer);
      clearTimeout(hideTimer);

    }
    function closeMenu(){
      if (!target.classList.contains('open')) return;
      hideTimer = setTimeout(function(){        
        target.classList.remove('open');
        var menuCont = document.getElementsByClassName('contextMenu')[0];
        if (menuCont) {
          document.body.removeChild(menuCont);
        };
        target.classList.remove('open');
      },300);
      console.log('closeMenu timer' + hideTimer);
    }
  }
