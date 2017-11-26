<template>
    <p class="page-container">404 page not found</p>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {

    },
    mounted() {
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name || '';
            this.sysUserAvatar = user.role || '';
            this.$router.push({ path: '/lawFirm'});
            // if (this.sysUserAvatar !== 99) {
            //     this.$router.push('/orderConten');
            // } else {
            //     this.$router.push('/users');
            // }
        }
    }
}
</script>