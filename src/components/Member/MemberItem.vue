<template>
    <tr>
        <th scope="row" v-text="index + 1"></th>
        <td v-on:click="memberDetail(member.memberId)">
            {{ member.memberId }}
        </td>
        <td>{{ member.password }}</td>
        <td>{{ member.nickname }}</td>
        <td>{{ member.emailId }}</td>
        <td>{{ member.emailDomain }}</td>
        <td>{{ member.phoneNumber }}</td>

        <td>{{ member.createdAt }}</td>
        <td>{{ member.modifiedAt }}</td>

        <td>{{ member.memberRole }}</td>
        <td>
            <div class="btn-item">
                <button type="button" id="btn-item-update" class="btn btn-primary"
                    v-on:click="adminUpdate(member.memberId)">
                    Update
                </button>
                <button type="button" id="btn-item-delete" class="btn btn-danger" v-on:click="adminDelete(member.memberId)">
                    Delete
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
import http from '@/api/lib/axios.js';
export default {
    name: 'MemberItem',
    props: {
        member: {},
        index: Number,
    },
    data() {
        return {
            message: '',
        };
    },
    created() {
        //console.log("2 " + this.member.memberId);
    },


    methods: {
        memberDetail(memberId) {
            this.$router.push(`/admin/memberdetail/${memberId}`);
        },
        adminUpdate(memberId) {
            this.$router.push(`/admin/adminupdate/${memberId}`);
        },
        adminDelete(id) { // 버튼 클릭시 삭제
            http.delete(`/memberDelete/${id}`).then(({ data }) => {
                alert("성공적으로 삭제했습니다.");
                this.$emit('dm');
            })
        },
    },
};
</script>

<style scope>
.btn-item {
    display: flex;
}

#btn-item-update,
#btn-item-delete {
    margin: 2px;
}</style>