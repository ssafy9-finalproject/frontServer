<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="logo d-flex align-items-center me-auto me-lg-0" @click="goHome">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Yummy Trip<span>.</span></h1>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/plan">Plan</router-link></li>
          <li><router-link to="/review">Review</router-link></li>
        </ul>
      </nav>
      <!-- .navbar -->
      <div>
        <div v-if="this.isLogin">
          <div v-if="this.userInfo.memberRole == 'U'">
            <router-link to="/user/mypage" class="btn-book-a-table">My Page</router-link>
            <button id="btn-logout" class="btn-book-a-table" v-on:click="signOut()">Log Out</button>
          </div>
          <div v-if="this.userInfo.memberRole == 'A'">
            <router-link to="/admin/memberlist" class="btn-book-a-table">Admin</router-link>
            <button id="btn-logout" class="btn-book-a-table" v-on:click="signOut()">Log Out</button>
          </div>
        </div>
        <div v-else>
          <router-link to="/login" class="btn-book-a-table">Sign In</router-link>
          <!-- <router-link to="/join" class="btn-book-a-table">Sign up</router-link> -->
        </div>
      </div>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "NavBar",
  data() {
    return {
      loginState: false,
      member: {},
    };
  },
  created() {
    this.role = this.$store.state.memberStore.userInfo.memberRole;
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),

    async signOut() {
      await this.userLogout(this.member.memberId);

      this.$store.state.memberStore.isLogin = false;
      sessionStorage.removeItem("vuex");
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
    goHome() {
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
#btn-logout {
  border: 0;
}
</style>
