<script lang="ts">
 let semester_selection: string;
 function goto_semester() {
     window.location.href = semester_selection;
 }
</script>

<article class="container">
    <h1>
        🫖 Teaweb
    </h1>

    <p>
        Welcome to the Teaweb NMT Scheduler, a successor to Beanweb.
    </p>

    <form on:submit={goto_semester}>
        <select required bind:value={semester_selection}>
            <option value="" disabled selected>Choose a semester...</option>
            <option value="/sched/2024/spr">Spring 2024</option>
        </select>
        <input type="submit" value="Create a schedule">
    </form>
</article>

<style>
 article {
     margin-top: 20vh;
     padding: 30px;
 }

 h1 {
     text-align: center;
 }
</style>
