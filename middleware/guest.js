export default function ({ store, redirect }) {
  if (!store.state.auth.user) {
      return true;
  }
  return redirect("/")
}
