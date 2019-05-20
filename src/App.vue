<template lang="pug">
#app
  transition(name="page"
              mode="out-in")
    router-view(:key="$route.path")
</template>

<style lang="sass">

</style>
