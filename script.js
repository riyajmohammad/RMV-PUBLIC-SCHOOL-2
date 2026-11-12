const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  const label = menuToggle.querySelector(".sr-only");
  if (label) label.textContent = isExpanded ? "Open navigation menu" : "Close navigation menu";
  primaryNav?.classList.toggle("is-open", !isExpanded);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    const label = menuToggle?.querySelector(".sr-only");
    if (label) label.textContent = "Open navigation menu";
  });
});

const inquiryForm = document.querySelector("#inquiry-form");

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const formData = new FormData(inquiryForm);
  const fields = [
    ["Parent / guardian", formData.get("parentName")],
    ["Child", formData.get("studentName")],
    ["Phone", formData.get("phone")],
    ["Email", formData.get("email")],
    ["Interested in", formData.get("grade")],
    ["Best time to contact", formData.get("preferredTime")],
    ["Message", formData.get("message")],
  ];
  const message = [
    "Hello R.M.V. Public School, I would like to enquire about admission.",
    "",
    ...fields
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([label, value]) => `${label}: ${value.trim()}`),
  ].join("\n");
  const whatsappUrl = `https://wa.me/919936285747?${new URLSearchParams({ text: message })}`;
  window.location.assign(whatsappUrl);
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
