import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {IWebsite} from "../types";

export const useWebsitesStore = defineStore(
    'websites',
    () => {

    const websites = ref<IWebsite[]>([])

    const percentOfSubscription = computed<string>(() => {
        if (!websites.value.length) return '0%'

        const subscriptions = websites.value.filter(website => website.isSubscribed).length;
        const totalSubscriptions = websites.value.length;
        return (subscriptions/totalSubscriptions * 100).toFixed(0) + '%'
    })

        async function getWebsites (): void  {
            try {
                const websitesData = await fetch('./data/Subscribe.json');
                websites.value = await websitesData.json()
            } catch (e) {
                console.error(e)
            }
        }

        async function toggleSubscription (id: number): void {
            const websiteToChange:IWebsite = websites.value
                .find(website => website.id == id)

            websiteToChange.isSubscribed = !websiteToChange.isSubscribed
        }

        async function toggleSubscriptionAll (needToSubscribeAll: boolean = true): void {
            websites.value
                .forEach((website) => website.isSubscribed = needToSubscribeAll)
        }

        return {
            websites,
            percentOfSubscription,
            getWebsites,
            toggleSubscription,
            toggleSubscriptionAll
        }
})
