<template>
    <div class="download-page">
        <div class="page-header">
            <h1>Downloads</h1>
            <p>Get the latest releases of Swift</p>
        </div>

        <div class="version-selector">
            <button
                v-for="version in versions"
                :key="version"
                @click="selectVersion(version)"
                :class="[
                    'version-button',
                    { active: selectedVersion === version },
                ]"
            >
                {{ version }}
            </button>
        </div>

        <div v-if="selectedVersion === '26.2'" class="warning-alert">
            <div class="alert-content">
                <strong>No stable builds available!</strong>
                <p>
                    Only experimental builds are available. Use with caution,
                    not recommended for production.
                </p>
            </div>
        </div>

        <div
            v-if="
                selectedVersion === '1.21.11' || selectedVersion === '1.21.10'
            "
            class="warning-alert"
        >
            <div class="alert-content">
                <strong>No longer receiving updates!</strong>
                <p>
                    This version is no longer receiving updates. Use the latest
                    stable version instead.
                </p>
            </div>
        </div>

        <div v-if="loading" class="loading-container">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>

        <div class="release-cards">
            <div
                v-for="release in filteredReleases"
                :key="release.id"
                class="release-card"
            >
                <div class="card-header">
                    <div class="release-info">
                        <h2>{{ release.name || release.tag_name }}</h2>
                        <div class="badges">
                            <span
                                v-if="release.prerelease"
                                class="badge prerelease"
                                >Pre-Release</span
                            >
                            <span class="badge date">{{
                                formatDate(release.published_at)
                            }}</span>
                        </div>
                    </div>
                </div>

                <div
                    class="release-notes"
                    v-html="renderMarkdown(release.body)"
                ></div>

                <div class="release-assets">
                    <ul>
                        <li v-for="asset in release.assets" :key="asset.id">
                            <a
                                :href="asset.browser_download_url"
                                class="asset-link"
                                target="_blank"
                            >
                                <span class="asset-name">{{ asset.name }}</span>
                                <span class="file-size"
                                    ><i class="fa-solid fa-download"></i>
                                    {{ asset.download_count }}</span
                                >
                                <span class="file-size">{{
                                    formatBytes(asset.size)
                                }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { marked } from "marked";

const releases = ref([]);
const latestReleaseTag = ref("");
const loading = ref(true);
const selectedVersion = ref("26.1.2");
const versions = ["26.2", "26.1.2", "1.21.11", "1.21.10"];

function renderMarkdown(md) {
    return marked.parse(md || "");
}

function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function selectVersion(version) {
    selectedVersion.value = version;
}

const filteredReleases = computed(() => {
    return releases.value.filter((r) =>
        r.tag_name.startsWith(selectedVersion.value),
    );
});

async function fetchReleases() {
    loading.value = true;
    try {
        const repo = "XDPXI/SwiftMC";
        const url = `https://api.github.com/repos/${repo}/releases`;
        const res = await axios.get(url);
        const data = res.data.slice(0, 10);
        releases.value = data;
        const latest = data.find((r) => !r.prerelease);
        if (latest) latestReleaseTag.value = latest.tag_name;
    } finally {
        loading.value = false;
    }
}

onMounted(fetchReleases);
</script>

<style scoped>
.download-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.page-header {
    text-align: left;
    margin-bottom: 1rem;
}

.page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(120deg, #3b82f6 30%, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-header p {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
}

.release-cards {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.release-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 15%);
    transition: all 0.3s ease;
}

.card-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.release-info {
    flex: 1;
}

.release-info h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: var(--vp-c-text-1);
    border: none;
}

.badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.badge {
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.prerelease {
    background-color: var(--vp-c-warning-soft);
    color: var(--vp-c-warning-1);
    border: 1px solid var(--vp-c-warning-2);
}

.date {
    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
}

.release-notes {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.95rem;
    line-height: 1.7;
}

.release-notes :deep(h1),
.release-notes :deep(h2),
.release-notes :deep(h3) {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--vp-c-text-1);
    border: none;
}

.release-notes :deep(ul),
.release-notes :deep(ol) {
    padding-left: 1.5rem;
}

.release-notes :deep(code) {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
}

.release-notes :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.release-notes :deep(th),
.release-notes :deep(td) {
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: left;
}

.release-notes :deep(th) {
    background: rgba(255, 255, 255, 0.08);
    font-weight: 600;
}

.release-notes :deep(tr:nth-child(even)) {
    background: rgba(255, 255, 255, 0.03);
}

.release-assets {
    padding-top: 1.5rem;
}

.release-assets h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: var(--vp-c-text-1);
}

.release-assets ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.75rem;
}

.asset-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    text-decoration: none;
    color: var(--vp-c-text-1);
    transition: all 0.2s ease;
}

.asset-link:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
}

.asset-name {
    flex: 1;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}

.file-size {
    color: var(--vp-c-text-2);
    font-size: 0.875rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.08);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    gap: 1rem;
    color: var(--vp-c-text-2);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--vp-c-divider);
    border-top: 5px solid var(--vp-c-brand-1);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.version-selector {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.75rem;
    margin-bottom: 2rem;
}

.version-button {
    padding: 0.5rem 1.25rem;
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background-color: transparent;
    color: var(--vp-c-text-1);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.version-button:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.05);
}

.version-button.active {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.warning-alert {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: calc(50vw - 50% + 1.5rem);
    padding-right: calc(50vw - 50% + 1.5rem);
    margin-bottom: 2rem;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background-color: var(--vp-c-warning-soft);
    color: var(--vp-c-warning-1);
}

.alert-content {
    flex: 1;
    line-height: 1.6;
}

.alert-content strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.alert-content p {
    margin: 0;
    font-size: 0.95rem;
}

@media (max-width: 640px) {
    .download-page {
        padding: 1rem 0.5rem;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .card-header {
        flex-direction: column;
        gap: 1rem;
    }

    .release-card {
        padding: 1.5rem;
    }

    .asset-link {
        flex-wrap: wrap;
        text-align: center;
    }

    .file-size {
        width: 100%;
        text-align: center;
    }

    .version-selector {
        margin-top: 1.5rem;
        gap: 0.5rem;
    }

    .version-button {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
    }

    .warning-alert {
        padding: 1rem;
        margin-bottom: 1.5rem;
    }

    .warning-alert i {
        font-size: 1.1rem;
    }

    .alert-content strong {
        font-size: 0.95rem;
    }

    .alert-content p {
        font-size: 0.9rem;
    }
}
</style>
