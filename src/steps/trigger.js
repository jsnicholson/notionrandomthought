const cron = require('node-cron');

export default defineComponent({
    async run({steps,$}){
        cron.schedule('0 2 * * *', () => {
            this.$emit("WorkflowStarted",{ "time_start":(new Date().toISOString()) });
        });
    }
});