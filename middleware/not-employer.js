export default function ({ store, redirect }) {
  if (store.state.auth.user) {
    if (store.state.auth.strategy == 'employer') {
      return redirect("/employer/dashboard")
    }
  }
  return true;
}
