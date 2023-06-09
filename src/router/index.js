import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlanView from "../views/Plan/PlanView.vue";
// 리뷰
import PlanReview from "../views/Review/PlanReview.vue";
import MyPlanList from "../views/Review/MyPlanList.vue";
import ReviewParent from "../views/Review/ReviewParent.vue";
import WriteReview from "../views/Review/WriteReview.vue";
import ReviewDetail from "../views/Review/ReviewDetail.vue";
import ReviewModify from "../views/Review/ReviewModify.vue";
// 로그인
import LoginView from "../views/Login/LoginView.vue";
// 회원가입
import JoinView from "../views/Join/JoinView.vue";
// 관리자
import AdminView from "../views/Admin/AdminView.vue";
// 사용자
import UserView from "../views/User/UserView.vue";
//에러
import ErrorView from "../views/Error/ErrorView.vue";
// 멤버컴포넌트
import MemberList from "../components/Member/MemberList";
import MemberDetail from "../components/Member/MemberDetail";
import AdminUpdate from "../components/Member/AdminUpdate";

// store
import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"]; // isvalidtoken
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    store.state.memberStore.isLogin = false;
    router.push({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "*",
    redirect: (to) => {
      return {
        name: "error",
        params: {
          message: "Page Not Found",
          status: 404,
        },
      };
    },
  },
  {
    path: "/plan",
    name: "plan",
    component: PlanView,
  },
  {
    path: "/error",
    name: "error",
    component: ErrorView,
    props: true,
  },
  {
    path: "/review",
    name: "review",
    component: ReviewParent,
    redirect: "/review/list",
    children: [
      {
        path: "list",
        name: "planreview",
        component: PlanReview,
      },
      {
        path: "plans",
        name: "myplanlist",
        component: MyPlanList,
      },
      {
        path: "myplan/:id",
        name: "writereview",
        component: WriteReview,
      },
      {
        path: "detail/:rid",
        name: "reviewdetail",
        component: ReviewDetail,
      },
      {
        path: "modify/:mid",
        name: "reviewmodify",
        component: ReviewModify,
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/join",
    name: "join",
    component: JoinView,
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: onlyAuthUser,
    component: AdminView,
    redirect: "/admin/memberlist",
    children: [
      {
        path: "memberlist",
        name: "memberlist",
        component: MemberList,
      },
      {
        path: "memberdetail/:memberId",
        name: "memberdetail",
        component: MemberDetail,
      },
      {
        path: "adminupdate/:memberId",
        name: "adminupdate",
        component: AdminUpdate,
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: UserView,
    children: [
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/User/MyPage"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
