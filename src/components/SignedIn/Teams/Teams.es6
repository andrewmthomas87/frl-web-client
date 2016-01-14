import socket from 'services/socket'

class Teams {

	constructor() {
		this.teams = []
	}

	get() {
		if (this.teams.length) {
			return Promise.resolve()
		}

		return new Promise((resolve, reject) => {
			socket.send('Teams.get').then((teams) => {
				this.teams = teams
				resolve()
			}).catch(reject)
		})
	}

	getTeams({ name, number, weeks, sort }) {
		let teams = this.teams.slice(0)

		if (name) {
			const regex = new RegExp(name, 'i')

			for (let i = 0; i < teams.length; ++i) {
				if (!regex.test(teams[i].name)) {
					teams.splice(i, 1)
					--i
				}
			}
		}

		if (number) {
			for (let i = 0; i < teams.length; ++i) {
				if (String(teams[i].teamNumber).indexOf(number) === -1) {
					teams.splice(i, 1)
					--i
				}
			}
		}

		if (weeks.length) {
			for (let i = 0; i < teams.length; ++i) {
				for (let j = 0; j < weeks.length; ++j) {
					if (teams[i].weeks.indexOf(weeks[j]) === -1) {
						teams.splice(i, 1)
						--i
						break
					}
				}
			}
		}

		if (sort === 'averageSeed') {
			teams = teams.sort(function(a, b) {
				const aAverageSeed = a.averageSeed || 1 / 0
				const bAverageSeed = b.averageSeed || 1 / 0

				return (aAverageSeed - bAverageSeed) || (a.teamNumber - b.teamNumber)
			})
		}
		else if (sort === 'averageCCWM') {
			teams = teams.sort(function(a, b) {
				const aAverageCCWM = a.averageCCWM || -1 / 0
				const bAverageCCWM = b.averageCCWM || -1 / 0

				return (bAverageCCWM - aAverageCCWM) || (a.teamNumber - b.teamNumber)
			})
		}
		else if (sort === 'eventWins') {
			teams = teams.sort(function(a, b) {
				const aEventWins = a.eventWins || -1 / 0
				const bEventWins = b.eventWins || -1 / 0

				return (bEventWins - aEventWins) || (a.teamNumber - b.teamNumber)
			})
		}

		return teams
	}

}

const TeamsInstance = new Teams()

export default TeamsInstance
