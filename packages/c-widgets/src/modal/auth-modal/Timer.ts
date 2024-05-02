export default class Timer
{
    private endTime = 0;
    private interval : string | number | undefined | NodeJS.Timeout;

    private readonly callback : (remain: number) => void;

    constructor (callback: (remain: number) => void) {
        this.callback = callback;
    }

    public start (time: number)
    {
        this.stop();
        this.callback(time);
        this.endTime = Date.now() + (time * 1000);
        this.interval = setInterval(() => {
            const remain = Math.max(Math.round((this.endTime - Date.now()) / 1000), 0);
            this.callback(remain);
            if(remain <= 0) {
                this.stop();
            }
        }, 1000);
    }

    public stop ()
    {
        clearInterval(this.interval);
    }
}
