// old way of creating the state.
import { reactive, readonly } from "vue"
import {defineStore} from "pinia"
import {Post, today, thisWeek, thisMonth, TimelinePost} from "../posts";
import { Period } from "../constants";
import { DateTime } from "luxon";


interface PostsState {
    ids: string[] // ["1", "2"]
    all: Map<string, Post>
    selectedPeriod: Period
}

function delay () {
    return new Promise<void>(res => setTimeout(res, 1500))
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map(),
        // new Map([
        //     [today.id, today],
        //     [thisWeek.id, thisWeek],
        //     [thisMonth.id, thisMonth],
        // ])
        selectedPeriod: "Today"
    }),

    actions: {
        setSelectedPeriod (period: Period) {
            this.selectedPeriod = period
        },

        async fetchPosts() {
            // Fetching Data
            const response = await fetch("http://localhost:8000/posts")
            const data = (await response.json()) as Post[]
            await delay()

            // assigning data
            let ids: string[] = []
            let all = new Map<string, Post>()
            for(const post of data) {
                ids.push(post.id)
                all.set(post.id, post)
            }

            // assigning to state
            this.ids = ids
            this.all = all
        },
         
        createPost: (post: TimelinePost) => {
            const body = JSON.stringify({ ...post, created: post.created.toISO() })
            return window.fetch("http://localhost:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body
            })
        }
    },

    getters: {
        filteredPosts: (state): TimelinePost[] => {
                return state.ids.map(id => {
                    const post = state.all.get(id)
            
                    if(!post) {
                        throw Error(`Post with id of ${id} was expected but now found.`)
                    }
                    return {
                    ...post,
                    created: DateTime.fromISO(post.created)
                }
            }).filter(post => {
                if(state.selectedPeriod === "Today"){
                    return post.created >= DateTime.now().minus({day: 1})
                }
                if(state.selectedPeriod === "This Week"){
                    return post.created >= DateTime.now().minus({week: 1})
                }
                return post
            })
        },
    }, 
})

// old way of state management:
// export class PostsStore {
//     #state: PostsState
    
//     constructor () {
//         this.#state = reactive<PostsState>({
//             foo: 'foo'
//         })
//     }

//     getState() {
//         return readonly(this.#state)
//     }

//     updateFoo(foo: string) {
//         this.#state.foo = foo
//     }
// } 

// const store = new PostsStore()

// export function usePosts () {
//     return store
// }