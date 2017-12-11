/**
 * 模拟Toast弹窗 toastIt('参加成功', 2500, {fontSize: '18px'});
 * @param {*} text 
 * @param {*} timeout 
 * @param {*} options 
 */
export let toastIt = (text, timeout, options) => {
  var timeout = timeout || 3000;
  let div = document.createElement("DIV");
  div.classList.add("divtoast");
  div.style.height = document.body.offsetHeight + "px";

  let toast = document.createElement("DIV");
  toast.classList.add("toast-it");
  toast.style.WebkitAnimationDuration = timeout / 1000 + "s";
  toast.style.MozanimationDuration = timeout / 1000 + "s";
  toast.style.OanimationDuration = timeout / 1000 + "s";
  toast.style.animationDuration = timeout / 1000 + "s";

  for (let prop in options) {
    toast.style[prop] = options[prop];
  }

  let mask = document.createElement("DIV");
  mask.classList.add("mask");
  let desc = document.createElement("DIV");
  desc.classList.add("toastDesc");
  let content = document.createTextNode(text);

  desc.appendChild(content);
  toast.appendChild(mask);
  toast.appendChild(desc);
  div.appendChild(toast);
  document.body.appendChild(div);
  setTimeout(function() {
    document.body.removeChild(div);
  }, timeout);
};
