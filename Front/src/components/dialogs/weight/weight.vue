<template>
    <div class="container">
        <p class="title">Introduce peso</p>
        <v-text-field type="number" placeholder="0" v-model="value"></v-text-field>
        <v-switch v-model="type" :label="isType"></v-switch>
        <p class="green" v-if="sent"> Peso guardado correctamente </p>
        <v-btn @click="this.$emit('exit', true)">Guardar</v-btn>
    </div>
</template>

<script>
    
    export default {
        name: 'weight',
        data: function(){
            return {
                value: 0,
                type: false,
            }
        },
        computed: {
            isType: function() {
                return type ? 'Peso real' : 'Peso planificado'
            }
        }
    }

</script>

<style lang="scss" module>

@import '../styles/baseDesign';

.container {
    display: flex;
    flex-direction: column;
    flex-grow: 1
}
</style>