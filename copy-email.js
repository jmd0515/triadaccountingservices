/* "Copy email" buttons: copy the address for visitors whose email link does nothing */
document.querySelectorAll(".copy-email").forEach(function (btn) {
  var label = btn.textContent;
  btn.addEventListener("click", function () {
    var email = btn.getAttribute("data-email");
    function done(ok) {
      btn.textContent = ok ? "Copied!" : "Copy failed";
      btn.classList.toggle("copied", ok);
      setTimeout(function () { btn.textContent = label; btn.classList.remove("copied"); }, 2000);
    }
    function fallback() {
      var t = document.createElement("textarea");
      t.value = email; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(t); done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, fallback);
    } else { fallback(); }
  });
});
