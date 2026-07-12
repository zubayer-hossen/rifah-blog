// Generates and persists a random id per browser so a visitor's
// reaction (love/haha/wow/sad) can be tracked without requiring login.
export const getVisitorId = () => {
  let id = localStorage.getItem("rifah_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("rifah_visitor_id", id);
  }
  return id;
};
