<template>
  <div class="download-page">
    <div class="release-cards">
      <div
          v-for="release in releases"
          :key="release.id"
          class="release-card"
      >
        <div class="card-header">
          <h1># {{ release.name || release.tag_name }}</h1>
          <span v-if="release.prerelease" class="badge prerelease">Pre-Release</span>
          <span v-else-if="release.tag_name === latestReleaseTag" class="badge latest">Latest</span>
        </div>
        <div
            class="release-notes"
            v-html="renderMarkdown(release.body)"
        ></div>
        <ul class="release-assets">
          <li v-for="asset in release.assets" :key="asset.id">
            <a :href="asset.browser_download_url" target="_blank">{{ asset.name }}</a>
            <span class="file-size">({{ formatBytes(asset.size) }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {marked} from 'marked';

const releases = ref([]);
const latestReleaseTag = ref('');

function renderMarkdown(md) {
  return marked.parse(md || '');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function fetchReleases() {
  const repo = 'XDPXI/SwiftMC';
  const url = `https://api.github.com/repos/${repo}/releases`;
  const res = await axios.get(url);
  const data = res.data.slice(0, 10);
  releases.value = data;
  const latest = data.find(r => !r.prerelease);
  if (latest) latestReleaseTag.value = latest.tag_name;
}

onMounted(fetchReleases);
</script>

<style scoped>
.download-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.release-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.release-card {
  border: 1px solid var(--vp-c-default-soft);
  border-radius: 12px;
  padding: 1rem;
  background: var(--vp-c-default-soft);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.latest {
  background-color: var(--vp-c-brand-3);
}

.prerelease {
  background-color: var(--vp-c-warning-3);
}

.release-notes {
  margin-top: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--vp-c-default-2);
}

.release-assets {
  list-style: none;
  padding-left: 0;
  margin-top: 0.5rem;
}

.release-assets li {
  margin: 0.25rem 0;
}

.release-assets a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.release-assets a:hover {
  text-decoration: underline;
}

.file-size {
  color: var(--vp-c-default-2);
  margin-left: 0.5rem;
  font-size: 0.85rem;
}
</style>
