export default function ({ store, redirect }) {
  if (store.state.auth.user) {
    if (store.state.auth.strategy == 'job_seeker') {
      return true;
    }
  }
  return redirect("/")
}
