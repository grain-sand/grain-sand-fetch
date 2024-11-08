import {defineConfig} from 'vitest/config'
import {config} from 'dotenv';


const {parsed} = config({path: '.env.local'})

const chromeArgs: any = ['auto-open-devtools-for-tabs']
const firefoxArgs: any = ['--devtools', '--lang zh-CN', '-start-maximized']

const name: 'chrome' | 'firefox' | 'edge' = 'chrome';

if (parsed.CHROME_DATA_DIR) {
	chromeArgs.push(`user-data-dir=${parsed.CHROME_DATA_DIR}\\data`)
	chromeArgs.push(`disk-cache-dir=${parsed.CHROME_DATA_DIR}\\cache`)
}

export default defineConfig({
	publicDir: './test-files',
	test: {
		browser: {
			enabled: true,
			name,
			// headless: false,
			providerOptions: {
				capabilities: {
					"goog:chromeOptions": {args: chromeArgs},
					"moz:firefoxOptions": {
						args: firefoxArgs,
						binary: 'E:\\Soft\\Firefox\\firefox.exe',
						prefs: {
							"devtools.everOpened": true,
							"devtools.toolbox.host": 'left',
							"devtools.toolbox.previousHost": 'bottom',
							'devtools.toolbox.selectedTool': 'webconsole',
							'devtools.toolbox.sidebar.width': 1180,
							'devtools.accessibility.enabled': false,
							'devtools.application.enabled': false,
							'devtools.memory.enabled': false,
							'devtools.performance.enabled': false,
						},

					},
				}
			},

		},
		include: ['./test-src/test-*.ts'],
		silent: true
	},
	logLevel: "error"
})
