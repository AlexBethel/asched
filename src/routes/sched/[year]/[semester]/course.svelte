<!-- Component to render a single course. -->
<script lang="ts">
 import type { ClassSection } from '$lib/data_types.ts';
 import { categorize } from '$lib/categories';
 import Section from './section.svelte';
 import { simple_translations } from '$lib/translation/course_names';

 export let course: string;
 export let classtimes: ClassSection[];

 const by_section = categorize(classtimes, (c) => c.section_number);

 function translate_title(banweb: string): string {
     for (const key in simple_translations)
         banweb = banweb.replaceAll(key, simple_translations[key]);
     return banweb;
 }
 const title = translate_title(classtimes[0].title);
</script>

<details>
    <summary>{course}: {title}</summary>
    {#each by_section as section}
        <Section {course} classtimes={section.items}></Section>
    {/each}
</details>
