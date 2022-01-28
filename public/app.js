

const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        created: null,

    },
    methods: {
        async createUrl() {
            try {
                console.log(this.url, this.slug);
                const response = await fetch('/url', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: this.url,
                        slug: this.slug,
                    })
                });
                this.created = await response.json();
            } catch (error) {
                console.log(error);
            }

        }
    }
})