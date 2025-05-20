import { defineStore, acceptHMRUpdate } from 'pinia'
import issuesData from '../services/IssuesService'
import { ref } from 'vue'
import filters from '../services/FiltersService.js'

export const useIssuesStore = defineStore('issues', {
  state: () => ({
    issues: issuesData,
    sorts: [
      { id: 'CreatedAt_asc', field: 'CreatedAt', value: 'Oldest', direction: 1 },
      { id: 'CreatedAt_desc', field: 'CreatedAt', value: 'Newest', direction: -1 },
      { id: 'LatestActivity_asc', field: 'LatestActivity', value: 'Oldest Update', direction: 1 },
      { id: 'LatestActivity_desc', field: 'LatestActivity', value: 'Newest Update', direction: -1 },
      { id: 'BusinessName_asc', field: 'businessName', value: 'Business Name A-Z', direction: 1 },
      { id: 'BusinessName_desc', field: 'businessName', value: 'Business Name Z-A', direction: -1 },
    ],
    activeFilters: ref({
      status: filters.topFilters[0],
      flagged: new Set(),
      type: new Set(),
      departments: new Set(),
    }),
    search: ref(''),
    issueIsOpen: ref(false),
  }),

  getters: {
    getIssueById: (state) => (id) => {
      return state.issues.find((issue) => issue.id === id)
    },
    getSortedIssues: (state) => {
      return [...state.issues].filter((x) => {
        // Apply status filter
        if (state.activeFilters.status.func !== -1 && x.open !== state.activeFilters.status.func) {
          return false
        }

        // Apply type filter
        if (state.activeFilters.type.size > 0) {
          const typeMatches = Array.from(state.activeFilters.type).some((filter) => {
            return x.type.toLowerCase() === filter.id.toLowerCase()
          })
          if (!typeMatches) return false
        }

        // Apply flagged filter
        if (state.activeFilters.flagged.size > 0) {
          const flaggedMatches = Array.from(state.activeFilters.flagged).some((filter) => {
            return x.flagged === filter.func
          })
          if (!flaggedMatches) return false
        }

        // Apply department filter
        if (state.activeFilters.departments.size > 0) {
          const departmentMatches = Array.from(state.activeFilters.departments).some((dept) => {
            return x.departmentResponsible === dept.value
          })
          if (!departmentMatches) return false
        }

        // Apply search filter
        if (state.search.value) {
          const searchLower = state.search.value.toLowerCase()
          return (
            x.businessName.toLowerCase().includes(searchLower) ||
            x.description.toLowerCase().includes(searchLower)
          )
        }

        return true
      })
      /*     .sort((a, b) => {
        if (a[selectedSort.value.field] < b[selectedSort.value.field]) {
          return selectedSort.value.direction
        }
        if (a[selectedSort.value.field] > b[selectedSort.value.field]) {
          return -selectedSort.value.direction
        }
        return 0
      })*/
    },
  },

  actions: {
    toggleFlag(issueId) {
      const issue = this.issues.find((issue) => issue.id === issueId)
      if (issue) {
        issue.flagged = !issue.flagged
      }
    },

    updateIssue(issueId, updates) {
      const index = this.issues.findIndex((issue) => issue.id === issueId)
      if (index !== -1) {
        this.issues[index] = { ...this.issues[index], ...updates }
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIssuesStore, import.meta.hot))
}
