export default function ({ store, redirect }) {
  if (store.state.auth.user) {
    let user = store.state.auth.user
    if (store.state.auth.strategy == 'employer') {
      if (user.employer.is_verified == 1) {
        return true;
      } else {
        return redirect("/employer/dashboard/edit?verify=1")
      }
    }
  }
  return redirect("/employer/login")
}
